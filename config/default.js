const config = {
    
    // JWT Secret
    jwt: {
        secret: (process.env.JWT_SECRET || 'test-jwt-secret'),
        tokenExpireTime: (60 * 60 * 1) // 1 day
    },

    // NODE ENV VARIABLES

    PORT: process.env.PORT || 3000

};

module.exports = config;