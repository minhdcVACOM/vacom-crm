import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import VcPress from '../vcPress';
import VcTextInput from '../vcTextInput';
interface IInput {
  icon?: (color: string) => ReactNode,
  label?: string,
  value?: string,
  callBack: (v: string) => void
}
interface IDialogOption {
  title: string;
  message?: string;
  input?: IInput | null;
  btnText: string[];
}
const AppDialogContext = createContext<{ show: (title: string, message: string, btnText?: string[], input?: IInput) => void } | undefined>(undefined);
export const useAppDialog = () => useContext(AppDialogContext);
export const AppDialogProvider = ({ children }: any) => {
  const [visible, setVisible] = useState(false);
  const [textDialog, setTextDialog] = useState("");
  const [dialogOptions, setDialogOptions] = useState<IDialogOption>({ title: '', message: '', btnText: [] });

  const show = (title: string, message: string, btnText = ["Xác nhận"], input?: IInput) => {
    setDialogOptions({ title, message, btnText, input });
    setVisible(true);
    setTextDialog(input?.value ?? "");
  };

  const hide = () => setVisible(false);

  return (
    <AppDialogContext.Provider value={{ show }}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>{dialogOptions.title}</Text>
            {dialogOptions.message && <Text style={styles.message}>{dialogOptions.message}</Text>}
            {dialogOptions.input && <VcTextInput
              label={dialogOptions.input.label}
              icon={(color) => { if (dialogOptions.input?.icon) return dialogOptions.input?.icon(color) }}
              placeholder={`Nhập ${dialogOptions.input.label}`}
              value={textDialog}
              onChangeText={setTextDialog}
            />}
            <View style={styles.buttonRow}>
              {dialogOptions.btnText.length > 1 &&
                <VcPress
                  skin='secondary'
                  style={{ borderRadius: 5, margin: 0, paddingVertical: 2 }}
                  title={dialogOptions.btnText[0] ?? "Hủy bỏ"}
                  onPress={() => {
                    hide();
                  }}
                />}
              <VcPress
                skin='primary'
                style={{ borderRadius: 5, margin: 0, paddingVertical: 2 }}
                title={dialogOptions.btnText[dialogOptions.btnText.length - 1] ?? "Xác nhận"}
                onPress={() => {
                  hide();
                  if (dialogOptions.input?.callBack) dialogOptions.input?.callBack(textDialog);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </AppDialogContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  dialog: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: "80%" },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  message: { marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 5, marginTop: 10 },
});
