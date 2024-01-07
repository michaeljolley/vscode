import { EventEmitter } from "vscode";
import { Credential } from "./types/credential";

/**
 * Event emitter for authentication status changes
 */
export const authStatusEventEmitter = new EventEmitter<Credential>();
