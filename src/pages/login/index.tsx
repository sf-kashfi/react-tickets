import { useState, FormEvent } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { onLoginRequest } from "../../app/services/Requests";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const data = await onLoginRequest({
      username: username,
      password: password,
    });

    if (data) {
      await login(data);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Form layout="vertical" onSubmitCapture={handleLogin}>
          <Form.Item label="Username" required>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item label="Password" required>
            <Input.Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Login Failed"
          open={isModalVisible}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
        >
          <p>Invalid username or password. Please try again.</p>
        </Modal>
      </Col>
    </Row>
  );
}

export default LoginPage;
