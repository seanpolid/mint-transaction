"use strict";

const register = {
	
	main: document.getElementsByTagName("main")[0],
	modalVisible: false,
	modal: document.createElement("form"),
	overlay: document.createElement("div"),
	
	hideClass: "hidden",
	modalClass: "modal",
	overlayClass: "overlay",
	
	init: () => {
		register.modal.classList.add(register.hideClass);
		register.overlay.classList.add(register.hideClass);
		
		register.createModal();
		register.createOverlay();
		
		const button = document.getElementsByTagName("button")[0];
		button.addEventListener('click', register.toggleModal, false);
		
		register.overlay.addEventListener('click', register.toggleModal, false);
	},
	
	createModal: () => {
		register.modal.method = "POST";
		register.modal.action = "/register";
		
		const usernameInput = document.createElement("input");
		usernameInput.name = "username";
		usernameInput.required = true;
		usernameInput.placeholder = "Username";
		usernameInput.type = "text";
		
		const passwordInput = document.createElement("input");
		passwordInput.name = "password";
		passwordInput.required = true;
		passwordInput.placeholder = "Password";
		passwordInput.type = "password";
		passwordInput.autocomplete = "new-password";
		
		const emailInput = document.createElement("input");
		emailInput.name = "email";
		emailInput.required = true;
		emailInput.placeholder = "Email";
		emailInput.type = "email";
		
		const phoneInput = document.createElement("input");
		phoneInput.name = "phone";
		phoneInput.required = true;
		phoneInput.placeholder = "Phone";
		phoneInput.type = "tel";
		
		const registerInput = document.createElement("input");
		registerInput.name = "submit";
		registerInput.value = "Register";
		registerInput.type = "submit";
		
		register.modal.classList.add(register.modalClass);
		
		register.modal.append(usernameInput, passwordInput, emailInput, phoneInput, registerInput);
		register.main.appendChild(register.modal);
	},
	
	createOverlay: () => {
		register.overlay.classList.add(register.overlayClass);
		register.main.appendChild(register.overlay);	
	},
	
	toggleModal: () => {
		register.clearModalInput();
		register.modal.classList.toggle(register.hideClass);
		register.overlay.classList.toggle(register.hideClass);
		register.modalVisible = !register.modalVisible;
	}, 
	
	clearModalInput: () => {
		for (const child of register.modal.children) {
			if (child.nodeName === "INPUT" && child.type !== "submit") {
				child.value = null;
			}	
		}
	}
	
}

register.init();

