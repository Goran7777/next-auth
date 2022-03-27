const path = require('path');
const withSass = require('@zeit/next-sass');
module.exports = {
  reactStrictMode: true,
};

module.exports = withSass({
  cssModules: true,
});
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
module.exports = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
