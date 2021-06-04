import React, { useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";

// Sounds
import NewProjectSound from "assets/sounds/new-project.mp3";
import ClientAcceptSound from "assets/sounds/client-accept.mp3";
import NewMessageSound from "assets/sounds/new-message.mp3";
import TypistFailedToAccept from "assets/sounds/typist-failed-to-accept.mp3";
import TypistAccept from "assets/sounds/typist-accept.mp3";

const Sounds = () => {
  const sounds = useSelector(state => state.Sounds);
  const user = useSelector(state => state.User);

  const play = src => {
    let audio = new Audio(src);
    audio.play();
  };

  // Client Accept
  useEffect(() => {
    if (user.playSounds && sounds.clientAccept) play(ClientAcceptSound);
  }, [user.playSounds, sounds.clientAccept]);

  // New Project
  useEffect(() => {
    if (user.playSounds && sounds.newProject) play(NewProjectSound);
  }, [user.playSounds, sounds.newProject]);

  // New Message
  useEffect(() => {
    if (user.playSounds && sounds.newMessage) play(NewMessageSound);
  }, [user.playSounds, sounds.newMessage]);

  // Typist Failed to Accept
  useEffect(() => {
    if (user.playSounds && sounds.typistFailedToAccept)
      play(TypistFailedToAccept);
  }, [user.playSounds, sounds.typistFailedToAccept]);

  // Typist Accept
  useEffect(() => {
    if (user.playSounds && sounds.typistAccept) play(TypistAccept);
  }, [user.playSounds, sounds.typistAccept]);

  return <></>;
};

export default Sounds;
