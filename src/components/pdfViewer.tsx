import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import vcAxios from '@/utils/vcAxios';
import { usePopup } from './dialog/popupProvider';
import { VcConstant } from '@/utils/constant';
import { Buffer } from 'buffer';

const PdfViewer = () => {
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { showPopup } = usePopup();
  const fileUrl = "/api/app/document/download/67db8d07f5729de6633291e3";

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            showPopup({ message: "Permission denied", iconType: "error" });
            return;
          }
        }

        const response = await vcAxios({
          url: fileUrl,
          method: 'GET',
          responseType: 'arraybuffer',
        });

        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition?.split('filename=')[1] || `download_${Date.now()}.pdf`;
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const base64Data = Buffer.from(response.data, 'binary').toString('base64');
        await RNFS.writeFile(path, base64Data, 'base64');

        setPdfPath(path);
      } catch (error: any) {
        // console.error("Download error:", error);
        showPopup({
          message: `Failed to download PDF: ${error.message || 'Unknown error'}`,
          iconType: "error"
        });
      } finally {
        setLoading(false);
      }
    };

    downloadPdf();
  }, [fileUrl]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color={VcConstant.colors.primary} />
      ) : pdfPath ? (
        <Pdf source={{ uri: pdfPath, cache: true }} style={{ flex: 1 }} />
      ) : null}
    </View>
  );
};

export default PdfViewer;
