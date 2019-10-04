import React from 'react';
import config from '../config'

export default class EditBookmark extends React.Component {
    state = {
        title: "",
        link: "",
        rating: null,
        details: ""
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(this.setBookmark)
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    setBookmark = bookmark => {
        const { title, link, rating, details } = bookmark;
        this.setState({
            title,
            link,
            rating,
            details
        })
    }

    updateTitle = newTitle => {
        this.setState({
            title: newTitle
        })
    }

    updateLink = newLink => {
        this.setState({
            link: newLink
        })
    }
    updateDetails = newDeetz => {
        this.setState({
            details: newDeetz
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const bookmark = {
            id: this.props.match.params,
            title: this.state.title,
            link: this.state.link,
            rating: this.state.rating,
            details: this.state.details
        }

        fetch(`${config.API_ENDPOINT}/${this.props.match.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            
            .then(this.props.history.push('/'))
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    render() {
        return (
            <section>
                <h2>Update a bookmark</h2>
                <form className='update-form' onSubmit={this.handleSubmit}>
                    <input id='title' type='text' name='title' placeholder='I am a title!' required value={this.state.title} onChange={e => this.updateTitle(e.target.value)} />
                    <label htmlFor='title'>Title</label>
                    <input id='link' type='text' name='link' placeholder='www.link.com' required value={this.state.link} onChange={e => this.updateLink(e.target.value)} />
                    <label htmlFor='link'>Link</label>
                    <input id='details' type='text' name='details' placeholder='I am a bunch of details!' required value={this.state.details} onChange={e => this.updateDetails(e.target.value)} />
                    <label htmlFor='details'>Details</label>
                    <button type='submit' onSubmit={this.handleSubmit}>Update</button>
                </form>
            </section>

        )
    }
}