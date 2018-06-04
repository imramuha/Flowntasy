module.exports = {
  'database': {
    'connectionString': 'mongodb://imosh:123456@ds121889.mlab.com:21889/mobdev2'
  },
  'auth': {
    'bcrypt': {
      'SALT_WORK_FACTOR': 10
    },
    'jwtSecret': 'mobdev2_nmd_gdm',
    'jwtSession': {
        session: false
    },
    'facebook': { 
      'clientID': '1828097764150932', 
      'clientSecret': 'fd93aa292b363e9834235ae6ba57cad0' 
    } 
  }  
};