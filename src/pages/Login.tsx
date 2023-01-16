import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import React from 'react';

const animationUrl = new URL('../assets/animation.gif', import.meta.url).href;
const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

function Login() {
  return (
    <EuiProvider colorMode="DARK">
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup
              justifyContent="center"
              alignItems="center"
            >
              <EuiFlexItem>
                <EuiImage
                  src={animationUrl}
                  alt="animation"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage
                  src={logoUrl}
                  alt="logo"
                  size="16.5rem"
                />
                <EuiSpacer size="xs" />
                <EuiText
                  textAlign="center"
                  grow={false}
                >
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> Connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton
                  fill
                  style={{ fontWeight: 'bold' }}
                >
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
