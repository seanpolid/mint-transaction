import { describe, test, beforeEach, afterEach, expect } from "vitest";
import Login from ".";
import { render, cleanup, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

describe('Login', () => {

    let login;
    let server;
    beforeEach(() => {
        login = <Login />
    })

    afterEach(() => {
        cleanup();

        if (server) {
            server.close();
        }
    })

    test('should render', () => {
        // Act
        render(login);

        // Assert
        expect(screen.queryByPlaceholderText('Username')).not.toBeNull();
        expect(screen.queryByPlaceholderText('Password')).not.toBeNull();
        expect(screen.queryByText('Forgot username')).not.toBeNull();
        expect(screen.queryByText('Forgot password')).not.toBeNull();
        expect(screen.queryByRole('button', {name: 'Login'})).not.toBeNull();
        expect(screen.queryByRole('button', {name: 'Create New Account'})).not.toBeNull();
        expect(screen.queryByAltText('GitHub login')).not.toBeNull();
        expect(screen.queryByAltText('Google login')).not.toBeNull();
    })

    test('should handle username change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(login);

        // Act
        await user.type(screen.getByPlaceholderText('Username'), 'username');

        // Assert
        expect(screen.getByPlaceholderText('Username').value).toBe('username');
    })

    test('should handle password change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(login);

        // Act
        await user.type(screen.getByPlaceholderText('Password'), 'password');

        // Assert
        expect(screen.getByPlaceholderText('Password').value).toBe('password');
    })

    test('should show registration', async () => {
        // Arrange
        const user = userEvent.setup();
        render(login);

        // Act
        await user.click(screen.getByRole('button', {name: 'Create New Account'}));

        // Assert
        expect(screen.getByRole('button', {name: 'Register'}).value).not.toBeNull();
    })

})