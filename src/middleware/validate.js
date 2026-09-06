const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    if (source === "query") {
      Object.assign(req.query, result.data);
    } else {
      req[source] = result.data;
    }

    next();
  };
};
export default validate;
