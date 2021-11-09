import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import Track from "./Track";

export class MusicSubscription {

    public queue: Track[]
    public readonly audioPlayer: AudioPlayer;

    constructor(){
        this.queue = [];
        this.audioPlayer = createAudioPlayer();
    }


    public enque(track: Track){
        this.queue.push(track)
        
        // Мы не await`им async метод, а пишем void - узнать почему :)
        void this.processQueue()
    }

    public async processQueue(): Promise<void>{
        if(this.queue.length === 0){
            return;
        }

        const nextTrack = this.queue.shift();
        try{
            const audioResource = await nextTrack?.createAudioResource();
            // fix проверку
            if(audioResource)
                this.audioPlayer.play(audioResource);
            
            // Понять смысл queueLock
            //this.queueLock = false;
        }
        catch(err){
            return this.processQueue();
        }
    }



}
