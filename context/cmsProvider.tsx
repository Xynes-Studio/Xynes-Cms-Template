"use client";
import React from "react";
import { LumiaProvider } from "lumia-ui";
import { cmsTheme } from "@/theme/theme";
import { ThemeProvider } from "styled-components";
import { NotificationsProvider } from "./notifications/notificationsProvider";
import { EditorProvider } from "./editor/editorProvider";
import { TextEditorProvider } from "./textEditor/textEditorProvider";
import { ModalProvider } from "./modals/modalProvider";
import { ListDataProvider } from "./listData/listDataProvider";
import { UserProvider } from "./user/userContext";

export const CMSProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <LumiaProvider theme={cmsTheme}>
      <UserProvider>
      <NotificationsProvider>
        <ModalProvider>
          <ListDataProvider>
            <EditorProvider>
              <TextEditorProvider>
                <ThemeProvider theme={cmsTheme}>{children}</ThemeProvider>
              </TextEditorProvider>
            </EditorProvider>
          </ListDataProvider>
        </ModalProvider>
      </NotificationsProvider>
      </UserProvider>
    </LumiaProvider>
  );
};
