const path = require('path');

const Hapi = require('@hapi/hapi');

const HapiInert = require('@hapi/inert');

const port = process.env.PORT || 3000;

const FILES = /\.(js|js.map|woff|woff2|svg|jpg|jpeg|gif|png)(\?v=\d+\.\d+\.\d+)?$/;

const PATH = {
  '/': 'index.html',
};

const init = async () => {
  const server = Hapi.server({
    port,
  });

  await server.register(HapiInert);

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, header) => {
      if (FILES.test(request.path)) {
        return header.file(path.join(process.cwd(), 'dist', request.path));
      }

      return header.file(path.join(process.cwd(), 'dist', PATH[request.path]));
    },
  });

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
