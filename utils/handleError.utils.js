/**
 * @name Handle_Error
 * @description Catch & Identifies errors then render error.ejs to response.
 */
export default function handleError(res, error) {
  console.log(error);

  const bundle = {
    title: error.status || 'Error',
    message: error.message || 'Something went wrong!',
    error,
  };

  return res.status(error.status || 500).render('pages/error', bundle);
}
