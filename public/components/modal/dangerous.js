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
import { EuiButton, EuiConfirmModal, EuiOverlayMask, EUI_MODAL_CONFIRM_BUTTON } from '@elastic/eui';

export default class Dangerous extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDestroyModalVisible: false,
    };
  }

  closeDestroyModal = () => {
    this.setState({ isDestroyModalVisible: false });
  };

  showDestroyModal = () => {
    this.setState({ isDestroyModalVisible: true });
  };

  action = () => {
    this.props.action(this);
  };

  render() {
    let destroyModal;

    if (this.state.isDestroyModalVisible) {
      destroyModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={this.props.title}
            onCancel={this.closeDestroyModal}
            onConfirm={this.action}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
            <p>{this.props.text}</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <EuiButton color="danger" fill onClick={this.showDestroyModal}>
          {this.props.buttonText}
        </EuiButton>
        {destroyModal}
      </div>
    );
  }
}
