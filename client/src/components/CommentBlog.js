import React from 'react'
import AddComment from './AddComment'
import './CommentBlog.css'

export default function CommentBlog() {

    const data = [
        {
            "Subject": "Lorem Ipsum",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu. Amet purus gravida quis blandit turpis cursus in. Nisl pretium fusce id velit ut tortor. Dolor magna eget est lorem ipsum. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Varius quam quisque id diam vel quam elementum pulvinar etiam. Mauris augue neque gravida in. Viverra orci sagittis eu volutpat odio facilisis mauris. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Etiam dignissim diam quis enim lobortis scelerisque. Nec nam aliquam sem et tortor. Dui ut ornare lectus sit amet. Facilisis sed odio morbi quis commodo odio aenean sed.",
            "Tags": "#Lorem #Ipsum #LoremIpsum"
        },
        {
            "Subject": "Lorem Ipsum",
            "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus cras adipiscing enim eu. Amet purus gravida quis blandit turpis cursus in. Nisl pretium fusce id velit ut tortor. Dolor magna eget est lorem ipsum. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Varius quam quisque id diam vel quam elementum pulvinar etiam. Mauris augue neque gravida in. Viverra orci sagittis eu volutpat odio facilisis mauris. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Etiam dignissim diam quis enim lobortis scelerisque. Nec nam aliquam sem et tortor. Dui ut ornare lectus sit amet. Facilisis sed odio morbi quis commodo odio aenean sed.",
            "Tags": "#Lorem #Ipsum #LoremIpsum"
        }
    ]

    const displayBlogs = data.map((item)=>{
        return (
            <div className="blogs">
                <h3>{item.Subject}</h3>
                <p>{item.Description}</p>
                <p>{item.Tags}</p>
                <AddComment/>
            </div>
        )
    })

    return (
        <div className="commentCont" >
            {displayBlogs}

        </div >
    )
}
