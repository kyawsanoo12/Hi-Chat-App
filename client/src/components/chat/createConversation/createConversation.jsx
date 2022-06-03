import React, { useEffect, useState } from 'react';
import { ButtonBase, Avatar, Typography } from "@material-ui/core";
import { API_HOST, checkConver } from '../../../api/Api';
import { useDispatch, useSelector } from "react-redux";
import { checkCon, newConversation } from "../../../action/index";
import { useNavigate } from "react-router-dom";

function CreateConversationSide({ users, classes, ownUserId, setCreateConSide,socket }) {
    const conversations = useSelector((state) => state.conversations)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const friends = useSelector((state) => state.users);

    const handleClick = async (receiverId) => {
        try {
            const { data } = await checkConver({receiver: receiverId });
            if (data.length > 0) {
                
                navigate(`/conversation/${data[0]._id}`);
                setCreateConSide(false)
            } else {
                await dispatch(newConversation({ receiverId: receiverId }, socket,navigate));
                setCreateConSide(false);
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }
    
    return (

        <div className={classes.scrollY}>
            {friends?.map((user) => {
              
                return (
                    <ButtonBase fullWidth key={user?._id} style={{ width: "100%", display: "flex", justifyContent: "flex-start" }} onClick={() =>  handleClick(user?._id) }>
                        <div className={classes.avatarContainer}>
                            <Avatar src={`${API_HOST}/images/user/${user?.image}`} />
                            <span className={classes.active}></span>

                        </div>

                        <div >
                            <Typography variant="h6">{user?.name}</Typography>

                        </div>
                    </ButtonBase>

                )
            })}
        </div>

    )
}

export default CreateConversationSide;