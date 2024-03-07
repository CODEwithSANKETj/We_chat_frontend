import React from 'react';
import { useSelector } from 'react-redux';

function Message_text({ person, item }) {
    const dateString = item.createdAt;
    const theme = useSelector((Store) => Store.theme.theme);
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    let [time, minute] = formattedDate.split(' ')[1].split(':').splice(0, 2);
    let bg = person._id === item.senderid;
    let color = `${theme == 'white' ? 'black' : 'white'}`;
    return (
        <div  className={`chat ${person._id === item.senderid ? 'chat-start' : 'chat-end'} text-black `}>

            {person._id == item.senderid &&
                <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                        <img alt="Chat bubble component" src={person.profilePic} />
                    </div>
                </div>
            }
            <div style={{
                whiteSpace: 'pre-wrap',
                maxWidth: '500px',
                overflow:'hidden',
                textOverflow:'ellipsis',
                border: `${bg && theme == 'black' ? '2px solid grey' : 'none'}`,
                color: color,
                backgroundColor: `${bg && theme == 'white' ? 'rgba(227, 217, 245 )' : bg && theme == 'black' ? 'black' : theme == 'white' ? 'rgba(247, 226, 195)' : 'rgba(82, 103, 189)'}`
            }}
                className="chat-bubble ">
                {item.message}
            </div>

            {/* <div style={{color:color}} className="chat-footer opacity-50 w-10">
                {`${time}:${minute}`}
            </div> */}
        </div>
    );
}

export default Message_text;
