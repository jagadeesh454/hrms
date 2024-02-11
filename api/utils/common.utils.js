
module.exports.wrapTryCatch = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.error(`Error in ${fn.name} function`)
      next(err)
    }
    );
  } // Forward any caught errors to the Express error handler
};