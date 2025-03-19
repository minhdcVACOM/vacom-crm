import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

type PdfViewerProps = {
    pdfUrl: string;
    accessToken: string;
};

export default function VcPdfViewer({ pdfUrl, accessToken }: PdfViewerProps) {
    const [localUri, setLocalUri] = useState<string | null>(null);

    useEffect(() => {
        async function downloadPdf() {
            const localFileUri = FileSystem.documentDirectory + 'downloaded.pdf';
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                // Có thể thêm các header khác ở đây nếu cần
            };

            try {
                const downloadResumable = FileSystem.createDownloadResumable(
                    pdfUrl,
                    localFileUri,
                    { headers }
                );
                const { uri }: any = await downloadResumable.downloadAsync();
                setLocalUri(uri);
            } catch (error) {
                console.error('Error downloading PDF:', error);
            }
        }
        downloadPdf();
    }, [pdfUrl, accessToken]);

    if (!localUri) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <WebView
            style={styles.webview}
            originWhitelist={['*']}
            source={{ uri: localUri }}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        flex: 1,
    },
});