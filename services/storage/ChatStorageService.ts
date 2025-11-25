/**
 * ChatStorageService
 *
 * Servicio especializado para la gestión de conversaciones y mensajes de chat.
 * Responsabilidad única: CRUD de conversaciones y mensajes de chat.
 */

import { ChatMessage, ChatConversation } from '../../src/types';

const STORAGE_KEY = 'rlp_chats';

/**
 * Obtiene todas las conversaciones del sistema
 * @returns Array de conversaciones
 */
export function getConversations(): ChatConversation[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guarda el array completo de conversaciones en localStorage
 * @param conversations - Array de conversaciones a guardar
 */
export function saveConversations(conversations: ChatConversation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

/**
 * Busca una conversación por su ID
 * @param id - ID de la conversación a buscar
 * @returns La conversación encontrada o null si no existe
 */
export function getConversationById(id: string): ChatConversation | null {
  const conversations = getConversations();
  return conversations.find(c => c.id === id) || null;
}

/**
 * Obtiene todas las conversaciones de un usuario específico
 * Las ordena por fecha de actualización (más reciente primero)
 *
 * @param userId - Username (RUT) del usuario
 * @returns Array de conversaciones ordenadas
 */
export function getConversationsForUser(userId: string): ChatConversation[] {
  const conversations = getConversations();
  return conversations
    .filter(c => c.participantIds.includes(userId))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

/**
 * Crea una nueva conversación o retorna la existente si ya existe
 * Busca conversaciones existentes con los mismos participantes
 *
 * @param participantIds - Array de usernames de participantes
 * @param participantNames - Array de nombres de participantes
 * @returns La conversación creada o existente
 */
export function createOrGetConversation(
  participantIds: string[],
  participantNames: string[]
): ChatConversation {
  const conversations = getConversations();
  const sortedIds = participantIds.sort();

  // Look for existing conversation with same participants
  const existing = conversations.find(c =>
    c.participantIds.sort().join(',') === sortedIds.join(',')
  );

  if (existing) {
    return existing;
  }

  // Create new conversation
  const newConversation: ChatConversation = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    participantIds: sortedIds,
    participantNames: participantNames,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.push(newConversation);
  saveConversations(conversations);
  return newConversation;
}

/**
 * Agrega un nuevo mensaje a una conversación existente
 *
 * @param conversationId - ID de la conversación
 * @param sender - Username (RUT) del remitente
 * @param senderName - Nombre del remitente
 * @param message - Contenido del mensaje
 * @returns El mensaje creado o null si la conversación no existe
 */
export function addChatMessage(
  conversationId: string,
  sender: string,
  senderName: string,
  message: string
): ChatMessage | null {
  const conversations = getConversations();
  const conversation = conversations.find(c => c.id === conversationId);

  if (!conversation) {
    return null;
  }

  const newMessage: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sender,
    senderName,
    message,
    timestamp: new Date().toISOString(),
  };

  conversation.messages.push(newMessage);
  conversation.lastMessage = newMessage;
  conversation.updatedAt = new Date().toISOString();

  saveConversations(conversations);
  return newMessage;
}
