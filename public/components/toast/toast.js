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

import React, { Component } from 'react';
import { EuiGlobalToastList, EuiPortal } from '@elastic/eui';

let addToastHandler;
let removeAllToastsHandler;
let toastId = 0;

export function addToast(title, content, type) {
  addToastHandler(title, content, type);
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

export default class StatusToast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };

    addToastHandler = this.addToast;
    removeAllToastsHandler = this.removeAllToasts;
  }

  addToast = (title, content, type) => {
    const toast = {
      title: title,
      text: content,
      color: type,
      id: toastId++,
    };

    this.setState({
      toasts: this.state.toasts.concat(toast),
    });
  };

  removeToast = removedToast => {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast.id !== removedToast.id),
    }));
  };

  removeAllToasts = () => {
    this.setState({
      toasts: [],
    });
  };

  render() {
    return (
      <EuiPortal>
        <EuiGlobalToastList
          toasts={this.state.toasts}
          dismissToast={this.removeToast}
          toastLifeTimeMs={6000}
        />
      </EuiPortal>
    );
  }
}
