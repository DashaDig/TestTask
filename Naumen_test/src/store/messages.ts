import { makeAutoObservable, runInAction } from "mobx";

const Api = "http://localhost:5000";
const messagesCountUpdate = 15;

interface messageType {
  file?: { fileName: string; apiUrl: string };
  text?: string;
  userInfo: {
    firstName: string;
    lastName: string;
    userId: number;
  };
}

interface messagesType {
  numberOfParticipants: number;
  messages: messageType[];
}

interface GroupsInfo {
  userId: number;
  chatGroupsInfo: {
    groupId: number;
    groupTitle: string;
  }[];
}

class Messages {
  user = { userId: 1, firstName: "Админ", lastName: "Администраторов" };
  unreadMessages: { groupId: number; unreadMessages: number }[];
  groupMessages: messagesType | null;
  visibleMeessages: messageType[];
  currGroup: number = 0;
  groupsInfo: GroupsInfo | null;
  inputMessage: string = "";
  inputFile: File | null;
  apiUrlForFile: string;

  constructor() {
    this.getGroups();
    this.getUnreadMessages();
    makeAutoObservable(this);
  }

  getGroups = async () => {
    let data = await fetch(Api + "/groups").then((response) => response.json());
    runInAction(() => (this.groupsInfo = data.data));
  };

  getUnreadMessages = async () => {
    let data = await fetch(Api + "/unread").then((response) => response.json());
    runInAction(() => (this.unreadMessages = data.data));
  };

  getGroupMessages = async (id: number) => {
    let data = await fetch(Api + "/messages/id" + id).then((response) =>
      response.json()
    );
    runInAction(() => {
      data.data.messages = [...data.data.messages].reverse();
      this.groupMessages = data.data;
      this.visibleMeessages = [...this.groupMessages.messages].splice(
        0,
        this.countOfPageGroupChat > 1
          ? messagesCountUpdate
          : this.groupMessages.messages.length
      );
      this.inputFile = null;
      this.inputMessage = "";
    });
  };

  setCurrGroup = (id: number) => {
    this.currGroup = id;
  };

  readMessages = (id: number) => {
    this.unreadMessages.find((x) => x.groupId === id).unreadMessages = 0;
  };

  setInputMessage = (text: string) => {
    this.inputMessage = text;
  };

  sendMessage = async () => {
    if (this.inputMessage === "" && this.inputFile === null) {
      return;
    }
    let currMessage: messageType;
    currMessage = {
      userInfo: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        userId: this.user.userId,
      },
    };

    if (this.inputMessage) {
      currMessage.text = this.inputMessage;
      this.inputMessage = "";
    } else {
      await this.sendFile();
      currMessage.file = {
        fileName: this.inputFile.name,
        apiUrl: this.apiUrlForFile,
      };
      this.inputFile = null;
    }
    try {
      await fetch(Api + "/new-messages", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(currMessage),
      });
    } catch (e) {
      console.log("error");
    }
  };

  sendFile = async () => {
    let data = new FormData();
    data.append("file", this.inputFile);
    let apiUrl = await fetch(Api + "/api/upload-file", {
      method: "POST",
      body: data,
    }).then((res) => res.json());
    runInAction(
      () => (this.apiUrlForFile = Api + "/" + apiUrl.path.replace("\\", "/"))
    );
  };

  getNewMessage = async () => {
    try {
      let data = await fetch(Api + "/get-messages").then((response) =>
        response.json()
      );
      runInAction(() => {
        this.visibleMeessages = [data, ...this.visibleMeessages];
      });
      await this.getNewMessage();
    } catch (e) {
      setTimeout(() => {
        this.getNewMessage();
      }, 500);
    }
  };

  setFile = (e: any) => {
    if (e.target.files) {
      this.inputFile = e.target.files[0];
      if (this.checkSizeOfFile) {
        this.inputMessage = "";
      }
    }
  };

  deleteFile = () => {
    this.inputFile = null;
  };

  uploadMesseges(page: number) {
    this.visibleMeessages = [
      ...this.visibleMeessages,
      ...[...this.groupMessages.messages].splice(
        (page - 1) * messagesCountUpdate,
        messagesCountUpdate
      ),
    ];
  }

  get checkSizeOfFile() {
    return this.inputFile.size < 1048576;
  }

  get countOfPageGroupChat() {
    return Math.ceil(this.groupMessages.messages.length / messagesCountUpdate);
  }

  get unreadMessagesChats() {
    return (
      this.unreadMessages &&
      this.unreadMessages.find((x) => x.unreadMessages > 0)
    );
  }
}

export default new Messages();
