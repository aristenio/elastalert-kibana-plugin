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

import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageBody,
  EuiButtonIcon,
  EuiToolTip,
} from '@elastic/eui';
// import '@elastic/eui/dist/eui_theme_light.css';
import { StatusToast } from '../toast';
import List from '../rules/list/list';

export const Main = props => (
  <React.Fragment>
    <StatusToast />
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>{props.title}</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <EuiToolTip position="left" content="Source @ GitHub">
              <EuiButtonIcon
                size="s"
                color="text"
                onClick={() =>
                  window.open('https://github.com/bitsensor/elastalert-kibana-plugin', '_blank')
                }
                iconType="logoGithub"
                aria-label="Github"
              />
            </EuiToolTip>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <List httpClient={props.httpClient} />
      </EuiPageBody>
    </EuiPage>
  </React.Fragment>
);
