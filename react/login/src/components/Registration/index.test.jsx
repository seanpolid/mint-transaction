import { beforeEach, describe, test, expect, afterEach, vi } from "vitest";
import Registration from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, render, cleanup, waitFor  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('Registration', () => {

    let registration;
    let server;
    beforeEach(() => {
        registration = <Registration handleRegistration={() => {}} />;
    })

    afterEach(() => {
        cleanup();

        if (server) {
            server.close();
        }
    })

    test('should render', () => {
        // Act
        render(registration);

        // Assert
        expect(screen.queryByPlaceholderText('Username')).not.toBeNull();
        expect(screen.queryByPlaceholderText('Password')).not.toBeNull();
        expect(screen.queryByPlaceholderText('Email')).not.toBeNull();
        expect(screen.queryByPlaceholderText('Phone')).not.toBeNull();
        expect(screen.queryByRole('button')).not.toBeNull(); 
    })

    test('should handle username change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);
        
        const username = 'username';
        
        // Act
        await user.type(screen.getByPlaceholderText('Username'), username);

        // Assert
        expect(screen.getByPlaceholderText('Username').value).toBe(username);
    })

    test('should handle password change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);
        const password = 'password';

        // Act
        await user.type(screen.getByPlaceholderText('Password'), password);

        // Assert
        expect(screen.getByPlaceholderText('Password').value).toBe(password);
    })

    test('should handle email change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        const email = 'email@gmail.com';

        // Act
        await user.type(screen.getByPlaceholderText('Email'), email);

        // Assert
        expect(screen.getByPlaceholderText('Email').value).toBe(email);
    })

    test('should handle phone change', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        const phone = '7341112222';

        // Act
        await user.type(screen.getByPlaceholderText('Phone'), phone);

        // Assert
        expect(screen.getByPlaceholderText('Phone').value).toBe(phone);
    })

    test('should handle empty form submission', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        // Act
        await user.click(screen.getByRole('button'));

        // Assert
        expect(screen.queryByText('provide a username', {exact: false})).not.toBeNull();
    })
    
    test('should handle form submission with only username', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        // Act
        await user.type(screen.getByPlaceholderText('Username'), 'username');
        await user.click(screen.getByRole('button'));

        // Assert
        expect(screen.queryByText('provide a password', {exact: false})).not.toBeNull();
    })
    
    test('should handle form submission with only username and password', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        await user.type(screen.getByPlaceholderText('Username'), 'username');
        
        // Act
        await user.type(screen.getByPlaceholderText('Password'), 'password');
        await user.click(screen.getByRole('button'));

        // Assert
        expect(screen.queryByText('provide a valid email', {exact: false})).not.toBeNull();
    })

    test('should handle invalid email', async () => {
        // Arrange
        const user = userEvent.setup();
        render(registration);

        await user.type(screen.getByPlaceholderText('Username'), 'username');
        await user.type(screen.getByPlaceholderText('Password'), 'password');

        // Act
        await user.type(screen.getByPlaceholderText('Email'), 'email');
        await user.click(screen.getByRole('button'));

        // Assert
        expect(screen.queryByText('provide a valid email', {exact: false})).not.toBeNull();
    })

    test('should handle registration error', async () => {
        // Arrange
        const mockFunctions = {
            handleRegistration: (username, password) => [username, password]
        }
        const spy = vi.spyOn(mockFunctions, 'handleRegistration');
        registration = <Registration handleRegistration={mockFunctions.handleRegistration} />

        const errorMessage = "Email in use.";
        const postAPI = rest.post('http://localhost:8080/api/user', (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({message: errorMessage}));
        })
        server = setupServer(postAPI);
        server.listen();

        const user = userEvent.setup();
        render(registration);

        await user.type(screen.getByPlaceholderText('Username'), 'username');
        await user.type(screen.getByPlaceholderText('Password'), 'password');
        await user.type(screen.getByPlaceholderText('Email'), 'email@gmail.com');

        // Act
        await user.click(screen.getByRole('button'));

        // Assert   
        await waitFor(() => {
            expect(spy).not.toHaveBeenCalledOnce();
            expect(screen.queryByText('Email in use.', {exact: false})).not.toBeNull();
        })
    })

    test('should handle registration success', async () => {
        // Arrange
        const mockFunctions = {
            handleRegistration: (username, password) => [username, password]
        }
        const spy = vi.spyOn(mockFunctions, 'handleRegistration');
        registration = <Registration handleRegistration={mockFunctions.handleRegistration} />

        const postAPI = rest.post('http://localhost:8080/api/user', (req, res, ctx) => {
            return res(ctx.status(200), null);
        })
        server = setupServer(postAPI);
        server.listen();

        const user = userEvent.setup();
        render(registration);

        await user.type(screen.getByPlaceholderText('Username'), 'username');
        await user.type(screen.getByPlaceholderText('Password'), 'password');
        await user.type(screen.getByPlaceholderText('Email'), 'email@gmail.com');

        // Act
        await user.click(screen.getByRole('button'));

        // Assert   
        await waitFor(() => {
            expect(spy).toHaveBeenCalledOnce();
        })
    })

})
