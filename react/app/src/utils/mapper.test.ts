import { test, expect, describe } from "vitest";

import { Category, Transaction, Type } from "../models";
import { TransactionDTO } from "../dtos";
import { mapper } from "./mapper";

describe("Mapper", () => {
	test("should convert type DTO to type", () => {
		// Arrange
		const typeDTO = {
			id: 1,
			name: "name",
		};
		const expected = new Type(1, "Name");

		// Act
		const actual = mapper.mapToType(typeDTO);

		// Assert
		expect(actual).toEqual(expected);
	});

	test("should convert category DTO to category", () => {
		// Arrange
		const categoryDTO = {
			id: 1,
			name: "name",
			type: {
				id: 1,
				name: "name",
			},
		};
		const type = new Type(1, "Name");
		const expected = new Category(1, "Name", type);

		// Act
		const actual = mapper.mapToCategory(categoryDTO);

		expect(actual).toEqual(expected);
	});

	test("should convert transaction DTO to transaction", () => {
		// Assert
		const transactionDTO: TransactionDTO = {
			id: 1,
			identifier: "uuid",
			category: {
				id: 1,
				name: "name",
				type: {
					id: 1,
					name: "name",
				},
			},
			startDate: "date",
			endDate: "date",
			paidInAdvance: true,
			amount: 10.22,
			notes: "notes",
		};
		const type = new Type(1, "Name");
		const category = new Category(1, "Name", type);
		const expected = new Transaction(
			1,
			"uuid",
			type,
			category,
			true,
			"date",
			"date",
			true,
			10.22,
			"notes",
			"uuid"
		);

		// Act
		const actual = mapper.mapToTransaction(transactionDTO);

		// Assert
		expect(actual).toEqual(expected);
	});

	test("should convert transaction to DTO", () => {
		// Arrange
		const type = new Type(1, "Name");
		const category = new Category(1, "Name", type);
		const transaction = new Transaction(
			1,
			"uuid",
			type,
			category,
			true,
			"date",
			"date",
			false,
			10.22,
			"notes",
			"uuid"
		);
		const expected: TransactionDTO = {
			id: 1,
			identifier: "uuid",
			amount: 10.22,
			startDate: "date",
			endDate: "date",
			paidInAdvance: false,
			notes: "notes",
			category: category,
		};

		// Act
		const actual = mapper.mapToTransactionDTO(transaction);

		// Assert
		expect(actual).toEqual(expected);
	});
});
