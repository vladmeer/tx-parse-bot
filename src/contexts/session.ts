import { type ChatMembersFlavor } from '@grammyjs/chat-members';
import type { I18nFlavor } from '@grammyjs/i18n';
import type { Context as BaseContext, SessionFlavor } from 'grammy';

export type Session = {
  method?: string;
};

export type SessionContext = BaseContext &
  SessionFlavor<Session> &
  I18nFlavor &
  ChatMembersFlavor;
