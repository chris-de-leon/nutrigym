/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation CreateBody($data: CreateBodyInput!) {\n  createBody(data: $data) {\n    id\n  }\n}": types.CreateBodyDocument,
    "query Body {\n  body {\n    id\n    userId\n    birthday\n    gender\n  }\n}": types.BodyDocument,
    "mutation UpdateBody($id: Uuid!, $data: UpdateBodyInput!) {\n  updateBody(id: $id, data: $data) {\n    count\n  }\n}": types.UpdateBodyDocument,
    "query Foods {\n  foods {\n    id\n    name\n    brand\n    calories\n    servingSize\n    servingUnit\n    totalProteinInGrams\n    totalCarbsInGrams\n    totalFatInGrams\n    polyunsaturatedFatInGrams\n    monounsaturatedFatInGrams\n    saturatedFatInGrams\n    potassiumInMilligrams\n    sodiumInMilligrams\n    dietaryFiberInGrams\n    sugarsInGrams\n    cholesterolInMilligrams\n    calciumInMilligrams\n    ironInMilligrams\n  }\n}": types.FoodsDocument,
    "mutation CreateGoal($data: CreateGoalInput!) {\n  createGoal(data: $data) {\n    id\n  }\n}": types.CreateGoalDocument,
    "query GoalByDate($date: Date!) {\n  goalByDate(date: $date) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}": types.GoalByDateDocument,
    "query GoalByID($id: Uuid!) {\n  goalByID(id: $id) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}": types.GoalByIdDocument,
    "query GoalByLatest {\n  goalByLatest {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}": types.GoalByLatestDocument,
    "query BodyMeasurementByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    bodyMeasurement {\n      id\n      createdAt\n      logId\n      weightInPounds\n      heightInInches\n      waterInMilliliters\n      shouldersInInches\n      forearmsInInches\n      calvesInInches\n      thighsInInches\n      waistInInches\n      chestInInches\n      armsInInches\n      neckInInches\n      hipsInInches\n      sleepInHours\n      steps\n    }\n  }\n}": types.BodyMeasurementByDateDocument,
    "mutation UpsertBodyMeasurement($date: Date!, $data: UpsertBodyMeasurementInput!) {\n  upsertBodyMeasurement(date: $date, data: $data) {\n    count\n  }\n}": types.UpsertBodyMeasurementDocument,
    "mutation CreateFoodMeasurementFromFoodDetails($date: Date!, $data: CreateFoodMeasurementFromFoodDetailsInput!) {\n  createFoodMeasurementFromFoodDetails(date: $date, data: $data) {\n    id\n  }\n}": types.CreateFoodMeasurementFromFoodDetailsDocument,
    "mutation CreateFoodMeasurementFromFoodID($date: Date!, $data: CreateFoodMeasurementFromFoodIdInput!) {\n  createFoodMeasurementFromFoodID(date: $date, data: $data) {\n    id\n  }\n}": types.CreateFoodMeasurementFromFoodIdDocument,
    "query FoodMeasurementsByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    foodMeasurements {\n      id\n      createdAt\n      logId\n      foodId\n      servingsConsumed\n      food {\n        id\n        name\n        brand\n        calories\n        servingSize\n        servingUnit\n        totalProteinInGrams\n        totalCarbsInGrams\n        totalFatInGrams\n        polyunsaturatedFatInGrams\n        monounsaturatedFatInGrams\n        saturatedFatInGrams\n        potassiumInMilligrams\n        sodiumInMilligrams\n        dietaryFiberInGrams\n        sugarsInGrams\n        cholesterolInMilligrams\n        calciumInMilligrams\n        ironInMilligrams\n      }\n    }\n  }\n}": types.FoodMeasurementsByDateDocument,
    "mutation UpdateFoodMeasurement($id: Uuid!, $date: Date!, $data: UpdateFoodMeasurementInput!) {\n  updateFoodMeasurement(id: $id, date: $date, data: $data) {\n    count\n  }\n}": types.UpdateFoodMeasurementDocument,
    "mutation RemoveMeasurements($id: Uuid!, $data: RemoveMeasurementsInput!) {\n  removeMeasurements(id: $id, data: $data) {\n    count\n  }\n}": types.RemoveMeasurementsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBody($data: CreateBodyInput!) {\n  createBody(data: $data) {\n    id\n  }\n}"): (typeof documents)["mutation CreateBody($data: CreateBodyInput!) {\n  createBody(data: $data) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Body {\n  body {\n    id\n    userId\n    birthday\n    gender\n  }\n}"): (typeof documents)["query Body {\n  body {\n    id\n    userId\n    birthday\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateBody($id: Uuid!, $data: UpdateBodyInput!) {\n  updateBody(id: $id, data: $data) {\n    count\n  }\n}"): (typeof documents)["mutation UpdateBody($id: Uuid!, $data: UpdateBodyInput!) {\n  updateBody(id: $id, data: $data) {\n    count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Foods {\n  foods {\n    id\n    name\n    brand\n    calories\n    servingSize\n    servingUnit\n    totalProteinInGrams\n    totalCarbsInGrams\n    totalFatInGrams\n    polyunsaturatedFatInGrams\n    monounsaturatedFatInGrams\n    saturatedFatInGrams\n    potassiumInMilligrams\n    sodiumInMilligrams\n    dietaryFiberInGrams\n    sugarsInGrams\n    cholesterolInMilligrams\n    calciumInMilligrams\n    ironInMilligrams\n  }\n}"): (typeof documents)["query Foods {\n  foods {\n    id\n    name\n    brand\n    calories\n    servingSize\n    servingUnit\n    totalProteinInGrams\n    totalCarbsInGrams\n    totalFatInGrams\n    polyunsaturatedFatInGrams\n    monounsaturatedFatInGrams\n    saturatedFatInGrams\n    potassiumInMilligrams\n    sodiumInMilligrams\n    dietaryFiberInGrams\n    sugarsInGrams\n    cholesterolInMilligrams\n    calciumInMilligrams\n    ironInMilligrams\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateGoal($data: CreateGoalInput!) {\n  createGoal(data: $data) {\n    id\n  }\n}"): (typeof documents)["mutation CreateGoal($data: CreateGoalInput!) {\n  createGoal(data: $data) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GoalByDate($date: Date!) {\n  goalByDate(date: $date) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"): (typeof documents)["query GoalByDate($date: Date!) {\n  goalByDate(date: $date) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GoalByID($id: Uuid!) {\n  goalByID(id: $id) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"): (typeof documents)["query GoalByID($id: Uuid!) {\n  goalByID(id: $id) {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GoalByLatest {\n  goalByLatest {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"): (typeof documents)["query GoalByLatest {\n  goalByLatest {\n    waterInMilliliters\n    weightInPounds\n    sleepInHours\n    proteinPercentage\n    carbsPercentage\n    fatPercentage\n    calories\n    steps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BodyMeasurementByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    bodyMeasurement {\n      id\n      createdAt\n      logId\n      weightInPounds\n      heightInInches\n      waterInMilliliters\n      shouldersInInches\n      forearmsInInches\n      calvesInInches\n      thighsInInches\n      waistInInches\n      chestInInches\n      armsInInches\n      neckInInches\n      hipsInInches\n      sleepInHours\n      steps\n    }\n  }\n}"): (typeof documents)["query BodyMeasurementByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    bodyMeasurement {\n      id\n      createdAt\n      logId\n      weightInPounds\n      heightInInches\n      waterInMilliliters\n      shouldersInInches\n      forearmsInInches\n      calvesInInches\n      thighsInInches\n      waistInInches\n      chestInInches\n      armsInInches\n      neckInInches\n      hipsInInches\n      sleepInHours\n      steps\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpsertBodyMeasurement($date: Date!, $data: UpsertBodyMeasurementInput!) {\n  upsertBodyMeasurement(date: $date, data: $data) {\n    count\n  }\n}"): (typeof documents)["mutation UpsertBodyMeasurement($date: Date!, $data: UpsertBodyMeasurementInput!) {\n  upsertBodyMeasurement(date: $date, data: $data) {\n    count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFoodMeasurementFromFoodDetails($date: Date!, $data: CreateFoodMeasurementFromFoodDetailsInput!) {\n  createFoodMeasurementFromFoodDetails(date: $date, data: $data) {\n    id\n  }\n}"): (typeof documents)["mutation CreateFoodMeasurementFromFoodDetails($date: Date!, $data: CreateFoodMeasurementFromFoodDetailsInput!) {\n  createFoodMeasurementFromFoodDetails(date: $date, data: $data) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateFoodMeasurementFromFoodID($date: Date!, $data: CreateFoodMeasurementFromFoodIdInput!) {\n  createFoodMeasurementFromFoodID(date: $date, data: $data) {\n    id\n  }\n}"): (typeof documents)["mutation CreateFoodMeasurementFromFoodID($date: Date!, $data: CreateFoodMeasurementFromFoodIdInput!) {\n  createFoodMeasurementFromFoodID(date: $date, data: $data) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FoodMeasurementsByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    foodMeasurements {\n      id\n      createdAt\n      logId\n      foodId\n      servingsConsumed\n      food {\n        id\n        name\n        brand\n        calories\n        servingSize\n        servingUnit\n        totalProteinInGrams\n        totalCarbsInGrams\n        totalFatInGrams\n        polyunsaturatedFatInGrams\n        monounsaturatedFatInGrams\n        saturatedFatInGrams\n        potassiumInMilligrams\n        sodiumInMilligrams\n        dietaryFiberInGrams\n        sugarsInGrams\n        cholesterolInMilligrams\n        calciumInMilligrams\n        ironInMilligrams\n      }\n    }\n  }\n}"): (typeof documents)["query FoodMeasurementsByDate($date: Date!) {\n  measurementsByDate(date: $date) {\n    id\n    createdAt\n    goalId\n    userId\n    month\n    year\n    day\n    foodMeasurements {\n      id\n      createdAt\n      logId\n      foodId\n      servingsConsumed\n      food {\n        id\n        name\n        brand\n        calories\n        servingSize\n        servingUnit\n        totalProteinInGrams\n        totalCarbsInGrams\n        totalFatInGrams\n        polyunsaturatedFatInGrams\n        monounsaturatedFatInGrams\n        saturatedFatInGrams\n        potassiumInMilligrams\n        sodiumInMilligrams\n        dietaryFiberInGrams\n        sugarsInGrams\n        cholesterolInMilligrams\n        calciumInMilligrams\n        ironInMilligrams\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateFoodMeasurement($id: Uuid!, $date: Date!, $data: UpdateFoodMeasurementInput!) {\n  updateFoodMeasurement(id: $id, date: $date, data: $data) {\n    count\n  }\n}"): (typeof documents)["mutation UpdateFoodMeasurement($id: Uuid!, $date: Date!, $data: UpdateFoodMeasurementInput!) {\n  updateFoodMeasurement(id: $id, date: $date, data: $data) {\n    count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveMeasurements($id: Uuid!, $data: RemoveMeasurementsInput!) {\n  removeMeasurements(id: $id, data: $data) {\n    count\n  }\n}"): (typeof documents)["mutation RemoveMeasurements($id: Uuid!, $data: RemoveMeasurementsInput!) {\n  removeMeasurements(id: $id, data: $data) {\n    count\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;