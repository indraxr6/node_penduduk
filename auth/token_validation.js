const {verify} = require('jsonwebtoken');
const secret = '#@$%^&*()_+';

module.exports = {

          checkToken : (req, res, next) => {
                    let token = req.get('authorization');

                    if (token) {
                              let wow = token.slice(7);
                              verify(wow, secret, (err, decoded) => {
                                        if (err) {
                                                  res.json({
                                                            success: 0,
                                                            message: 'Login first',
                                                            err
                                                  })
                                        }else {
                                                  let user = decoded.result;
                                                  next();
                                        }           
                              })
                              }else {
                                        res.json({
                                                  success: 0,
                                                  message: 'Access denied : unauthorized'
                                        })
                    }
                    
          }
}
