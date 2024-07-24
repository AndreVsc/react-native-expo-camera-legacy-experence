# Aplicativo de Gravação e Gerenciamento de Vídeos

Este projeto é um aplicativo React Native criado com Expo que permite aos usuários gravar vídeos, visualizá-los e gerenciá-los com funcionalidades como compartilhamento e salvamento. O aplicativo também lida com permissões necessárias para acessar a câmera, microfone e biblioteca de mídia.

## Visão Geral

O aplicativo fornece uma interface intuitiva para:
- Gravar vídeos usando a câmera do dispositivo.
- Pausar e retomar gravações.
- Exibir o vídeo gravado com controles para compartilhar, salvar ou descartar o vídeo.
- Gerenciar permissões de câmera, microfone e biblioteca de mídia.

### Principais Componentes

#### 1. `App.tsx`

- **Função Principal**: Gerencia permissões e controla o fluxo entre a gravação de vídeo e a visualização do vídeo gravado.
- **Lógica**:
  - **Gerenciamento de Permissões**: Solicita permissões para câmera, microfone e biblioteca de mídia usando hooks do Expo.
  - **Gravação de Vídeos**: Inicia, para, pausa e retoma a gravação de vídeos através de uma referência à `CameraView`.
  - **Exibição do Vídeo**: Exibe o vídeo gravado no componente `VideoPlayer` se um vídeo estiver disponível.

>
  ```typescript
  // Solicitação de permissões
  const [permissionCam, requestPermissionCam] = useCameraPermissions();
  const [permissionMicro, requestPermissionMicro] = useMicrophonePermissions();
  const [permissionResponse, requestPermissionLibrary] = MediaLibrary.usePermissions();
 ```

### Camera.tsx

**Função Principal:** Fornece a interface da câmera com botões para iniciar, parar, pausar e retomar a gravação.

**Lógica:**

- **Controles de Gravação:** Usa ícones do Feather para mostrar os botões de controle da gravação. As ações são passadas como props do `App.tsx`.

```typescript
// Componente da câmera com botões de controle
export const CameraComponent = ({ cameraRef, isRecording, isPaused, onRecord, onStopRecording, onPauseRecording, onResumeRecording }: CameraViewProps) => {
  return (
    <CameraView style={styles.camera} ref={cameraRef} mode='video'>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={isRecording ? onStopRecording : onRecord}>
            <Text style={styles.buttonText}>
              {isRecording ? <Feather name="stop-circle" size={60} color="white" /> : <Feather name="play-circle" size={60} color="white" />}
            </Text>
          </TouchableOpacity>
          {isRecording && (
            <TouchableOpacity onPress={isPaused ? onResumeRecording : onPauseRecording}>
              <Text style={styles.buttonText}>
                {isPaused ? <Feather name="play-circle" size={60} color="white" /> : <Feather name="pause-circle" size={60} color="white" />}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </CameraView>
  );
}
```

### VideoPlayer.tsx

**Função Principal:** Exibe o vídeo gravado com opções para compartilhamento, salvamento e exclusão.

**Lógica:**

- **Controles do Vídeo:** Usa ícones do Ionicons para fornecer botões de compartilhamento, salvamento e exclusão do vídeo.

```typescript
// Componente para exibir o vídeo e botões de ação
export default function VideoPlayer({ video, onShare, onSave, onDiscart }: VideoPlayerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          isLooping
      />
      <View style={styles.menuButtons}>
        <TouchableOpacity style={styles.button} onPress={onDiscart}>
            <Text style={styles.buttonText}><FontAwesome6 name="trash" size={30} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}><Ionicons name="share-social" size={35} color="white" /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}><Ionicons name="download" size={40} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

```

### Aprendizados e Conceitos

- **Gerenciamento de Permissões**
  - **Objetivo:** Garantir que o aplicativo tem permissão para acessar a câmera, microfone e biblioteca de mídia.
  - **Implementação:** Uso de hooks do Expo (`useCameraPermissions`, `useMicrophonePermissions`, `MediaLibrary.usePermissions`) para solicitar e verificar permissões.

- **Controle da Gravação de Vídeo**
  - **Objetivo:** Controlar a gravação de vídeos, incluindo início, parada, pausa e retomada.
  - **Implementação:** Manipulação de estados (`isRecording`, `isPaused`) e chamadas de métodos (`recordAsync`, `stopRecording`) para controlar a câmera.

- **Exibição e Gerenciamento do Vídeo**
  - **Objetivo:** Exibir o vídeo gravado e permitir ações como compartilhamento, salvamento e exclusão.
  - **Implementação:** Uso do componente `Video` do `expo-av` e integração com `expo-sharing` e `expo-media-library` para compartilhar e salvar vídeos.

- **Componentes Funcionais e Props**
  - **Objetivo:** Modularizar a lógica e a interface do usuário.
  - **Implementação:** Passagem de funções e estados como props para componentes filhos (`CameraComponent`, `VideoPlayer`) para controle de ações e exibição.

- **Tratamento de Erros e Feedback ao Usuário**
  - **Objetivo:** Garantir uma experiência de usuário robusta e sem falhas.
  - **Implementação:** Uso de blocos `try-catch` para captura e manejo de erros durante operações críticas, como gravação de vídeo.

### Conclusão

Este aplicativo ilustra a integração de funcionalidades de câmera e gerenciamento de mídia em uma aplicação React Native com Expo. Ele demonstra como lidar com permissões, controlar a gravação de vídeo e fornecer uma interface amigável para os usuários interagirem com vídeos gravados. A modularização e o tratamento de erros contribuem para a manutenção e a robustez do aplicativo.

