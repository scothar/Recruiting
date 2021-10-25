import React, { Component } from 'react';
import './assets/Conversation.css';
import MessageBubble from './MessageBubble'
import Dropzone from 'react-dropzone';
import styles from './assets/Conversation.module.css'
import {Button, Form, Icon, Input} from "antd";
import ConversationsMessages from "./ConversationsMessages";
import PropTypes from "prop-types";
import fetch from 'node-fetch';

class Conversation extends Component {
  constructor(props) {
    super(props);
    const { myIdentity, data, url } = props;

    this.state = {
        newMessage: '',
        conversationProxy: props.conversationProxy,
        messages: [],
        loadingState: 'initializing',
        boundConversations: new Set(),
        identity: myIdentity,
        recruiterData: data,
        url: url
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

  }

  handleAdd = async (sid, user) => {
    const res = await fetch(this.state.url + '/conversations/add/' + sid + '/' + user);
  }
  /*
  * Send vcf Card
  * see: https://www.twilio.com/docs/conversations/media-support-conversations
  */
  handleClick = async (e) => {
    
    let vcf = this.state.recruiterData.find( r => r.name == e).vcf
    console.log("Sending vcf for ", vcf);
    
    const res = await fetch(vcf)
    console.log("RESPONSE", res);
    
    const buff = await res.buffer()
    this.state.conversationProxy.sendMessage({contentType: "text/vcard", media: buff});
  }

  handleClose = async (sid) => {
    await this.closeConversation(sid);

  }

  loadMessagesFor = (thisConversation) => {
    if (this.state.conversationProxy === thisConversation) {
        thisConversation.getMessages()
            .then(messagePaginator => {
                if (this.state.conversationProxy === thisConversation) {
                    this.setState({ messages: messagePaginator.items, loadingState: 'ready' });
                }
            })
            .catch(err => {
                console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
                this.setState({ loadingState: "failed" });
            });
    }
  };

  componentDidMount = () => {
      if (this.state.conversationProxy) {
        this.loadMessagesFor(this.state.conversationProxy);

        if (!this.state.boundConversations.has(this.state.conversationProxy)) {
            let newConversation = this.state.conversationProxy;
            newConversation.on('messageAdded', m => this.messageAdded(m, newConversation));
            this.setState({boundConversations: new Set([...this.state.boundConversations, newConversation])});
        }
      }
  }

  componentDidUpdate = (oldProps, oldState) => {
    if (this.state.conversationProxy !== oldState.conversationProxy) {
        this.loadMessagesFor(this.state.conversationProxy);

        if (!this.state.boundConversations.has(this.state.conversationProxy)) {
            let newConversation = this.state.conversationProxy;
            newConversation.on('messageAdded', m => this.messageAdded(m, newConversation));
            this.setState({boundConversations: new Set([...this.state.boundConversations, newConversation])});
        }
    }
  };

  static getDerivedStateFromProps(newProps, oldState) {
    let logic = (oldState.loadingState === 'initializing') || oldState.conversationProxy !== newProps.conversationProxy;
    if (logic) {
      return { loadingState: 'loading messages', conversationProxy: newProps.conversationProxy };
    } else {
      return null;
    }
  }

  messageAdded = (message, targetConversation) => {
    if (targetConversation === this.state.conversationProxy)
        this.setState((prevState, props) => ({
            messages: [...prevState.messages, message]
        }));
  };

  onMessageChanged = event => {
    this.setState({ newMessage: event.target.value });
  };
  
  closeConversation = async (sid) =>{
    fetch(this.state.url + '/conversations/close/'+ sid);
  }

/*
* Send Message to Conversation
* see http://media.twiliocdn.com/sdk/js/conversations/releases/1.2.3/docs/Conversation.html#sendMessage__anchor
*/
  sendMessage = event => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.state.conversationProxy.sendMessage(message);
  };

  onDrop = acceptedFiles => {
    this.state.conversationProxy.sendMessage({contentType: acceptedFiles[0].type, media: acceptedFiles[0]});
  };

  render = () => {
    return (
        <Dropzone
            onDrop={this.onDrop}
            accept="image/*">
          {({getRootProps, getInputProps, isDragActive}) => (
              <div
                  {...getRootProps()}
                  onClick={() => {
                  }}
                  id="OpenChannel"
                  style={{position: "relative", top: 0}}>

                {isDragActive &&
                <div className={styles.drop}>
                  <Icon type={"cloud-upload"}
                        style={{fontSize: "5em", color: "#fefefe"}}/>
                  <h3 style={{color: "#fefefe"}}>Release to Upload</h3>
                </div>
                }
                <div
                    className={styles.messages}
                    style={{
                      filter: `blur(${isDragActive ? 4 : 0}px)`,
                    }}
                >
                  <input id="files" {...getInputProps()} />
                  <div style={{flexBasis: "100%", flexGrow: 2, flexShrink: 1, overflowY: "scroll"}}>
                    <ConversationsMessages
                        identity={this.props.myIdentity}
                        messages={this.state.messages}/>
                  </div>
                  <div>
                    <Form onSubmit={this.sendMessage}>
                      <Input.Group compact={true} style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row"
                      }}>
                        <Input
                            style={{flexBasis: "100%"}}
                            placeholder={"Type your message here..."}
                            type={"text"}
                            name={"message"}
                            id={styles['type-a-message']}
                            autoComplete={"off"}
                            disabled={this.state.loadingState !== 'ready'}
                            onChange={this.onMessageChanged}
                            value={this.state.newMessage}
                        />
                        <Button icon="enter" htmlType="submit" type={"submit"}/>
                        <Button icon="idcard" onClick={ () => this.handleClick(this.state.identity) }/>
                        <Button icon="plus" onClick = { () => this.handleAdd(this.state.conversationProxy.sid, "bob")} />
                        <Button icon="close" onClick = { () => this.handleClose(this.state.conversationProxy.sid) } />
                      </Input.Group>
                    </Form>
                  </div>
                </div>
              </div>
          )}

        </Dropzone>
    );
  }
}

Conversation.propTypes = {
  myIdentity: PropTypes.string.isRequired
};

export default Conversation;