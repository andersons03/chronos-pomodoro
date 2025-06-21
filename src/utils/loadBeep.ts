import audioFile from '../assets/audios/mixkit-fairy-magic-sparkle.wav';

export function loadBeep() {
  const audio = new Audio(audioFile);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play();
    audio.play().catch(erro => {
      console.log(erro);
    });
  };
}
