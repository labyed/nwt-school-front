import { Hapiness, HttpServerExt } from '@hapiness/core';

import { ApplicationModule } from './application.module';

// bootstrap application
Hapiness.bootstrap(ApplicationModule, [
    HttpServerExt.setConfig({
        host: '0.0.0.0', port: 9000, options: {
            connections: {
                routes: {
                    cors: {
                        origin: ['http://0.0.0.0:4200', 'http://localhost:4200', 'http://127.0.0.1:4200']
                    }
                }
            }
        }
    })
]);