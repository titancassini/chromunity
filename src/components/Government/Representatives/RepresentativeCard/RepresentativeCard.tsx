import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import {getUserSettingsCached} from '../../../../blockchain/UserService';
import {ifEmptyAvatarThenPlaceholder} from '../../../../util/user-util';

export interface RepresentativeCardProps {
    name: string
}

export interface RepresentativeCardState {
    avatar: string
}

class RepresentativeCard extends React.Component<RepresentativeCardProps, RepresentativeCardState> {

    constructor(props: RepresentativeCardProps) {
        super(props);
        this.state = {avatar: ""};
    }

    render() {
        if (this.props.name != null) {
            return (
                <Grid item xs={4} justify="center">
                    <Card key={"representative-" + this.props.name} className="representative-card">
                        <CardContent>
                            <img src={this.state.avatar} className="representant-avatar" alt="Profile Avatar"/>
                            <Typography gutterBottom variant="subtitle1" component="p">
                                <Link className="pink-typography" to={"/u/" + this.props.name}>@{this.props.name}</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            );
        } else {
            return (<div></div>)
        }
    }

    componentDidMount() {
        getUserSettingsCached(this.props.name, 1440)
            .then(settings => this.setState({avatar: ifEmptyAvatarThenPlaceholder(settings.avatar, this.props.name)}));
    }
}

export default RepresentativeCard;
