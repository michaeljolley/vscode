import { EventEmitter } from "vscode";
import { Credential } from "./types/credential";

/**
 * Event emitter for authentication status changes
 */
export const authStatusEventEmitter = new EventEmitter<Credential>();

/**
 * Event emitter for number assignment changes
 */
export const numberAssignmentEventEmitter = new EventEmitter<string>();
