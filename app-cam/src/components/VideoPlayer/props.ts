export interface VideoPlayerProps{
    video: {uri:string}| undefined;
    onShare:()=>void;
    onSave:()=>void;
    onDiscart:()=>void;
}