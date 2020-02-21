/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import fetch from 'node-fetch';

export default function(server, options) {
  const baseUri = `http${options.serverSsl ? 's' : ''}://${options.serverHost}:${
    options.serverPort
  }`;

  server.route({
    path: '/api/elastalert/{path*}',
    method: ['GET', 'POST', 'DELETE'],
    handler: req => {
      const uri = `${baseUri}/${req.params.path || ''}`;
      return fetch(uri, {
        method: req.method,
        headers: { 'Content-type': 'application/json' },
        body: req.payload ? JSON.stringify(req.payload) : null,
      }).then(res => {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return res.json();
        } else {
          return res.text();
        }
      });
    },
  });
}
