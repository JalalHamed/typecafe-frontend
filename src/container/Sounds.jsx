import React, { useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";
import { Howl } from "howler";

// Sounds
import NewProjectSound from "assets/sounds/new-project.mp3";
import ClientAcceptSound from "assets/sounds/client-accept.mp3";
import NewMessageSound from "assets/sounds/new-message.mp3";

const Sounds = () => {
  const sounds = useSelector(state => state.Sounds);
  const user = useSelector(state => state.User);

  const play = src => {
    new Howl({ src: [src] }).play();
  };

  // Client Accept
  useEffect(() => {
    if (user.playSounds && sounds.clientAccept) play(ClientAcceptSound);
  }, [sounds.clientAccept, user.playSounds]);

  // New Project
  useEffect(() => {
    if (user.playSounds && sounds.newProject) play(NewProjectSound);
  }, [sounds.newProject, user.playSounds]);

  // New Message
  useEffect(() => {
    if (user.playSounds && sounds.newMessage) play(NewMessageSound);
  }, [sounds.newMessage, user.playSounds]);

  return <></>;
};

export default Sounds;
