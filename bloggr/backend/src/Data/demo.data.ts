import User  from "../model/user.model";
import Blog from "../model/blog.model";
import {Request, Response} from "express";
import { getUsers } from "../service/user.service";
import log from "../logger";
import { getBlogs } from "../service/blog.service";

export default async function demo(req: Request, res: Response) {

    const users = await getUsers();
    await populateData(users, createDemoUsers);

    const blogs = await getBlogs();
    await populateData(blogs, createDemoBlogs);

    return res.send("Demo data loaded");

}

async function populateData(data: Array<any>, method){
    if (data===[]) try {
        await method();
    } catch (e) {
        log.error(e);
    }
}

async function createDemoUsers() {
    let users = [
        { email: 'bd@mail.org', name: 'Bradley', password: 'abcdefg',  passwordConfirmation: 'abcdefg' },
        { email: 'javk@mail.org', name: 'Javk', password: 'abcdefg',  passwordConfirmation: 'abcdefg' },
        { email: 'erin@mail.org', name: 'Erin', password: 'abcdefg',  passwordConfirmation: 'abcdefg' },
    ];
    try {
        for (const user of users) {
            await User.create(user);
            log.info(`Created user ${user.email} ${user.name}`);
        }
    } catch (e) {
        log.error(e);
    }
}

async function createDemoBlogs() {
    let users = await getUsers();

    const blogBody1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur lorem donec massa sapien faucibus et. Ac tortor dignissim convallis aenean et tortor. Neque laoreet suspendisse interdum consectetur. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Consequat nisl vel pretium lectus. Nullam vehicula ipsum a arcu cursus vitae congue. A erat nam at lectus urna duis. Vulputate eu scelerisque felis imperdiet proin fermentum. Eu ultrices vitae auctor eu augue. Sodales neque sodales ut etiam sit amet nisl purus. Dis parturient montes nascetur ridiculus. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Eget mauris pharetra et ultrices neque ornare. Nibh sed pulvinar proin gravida hendrerit lectus a. Nunc id cursus metus aliquam.\n' +
        '\n' +
        'Sit amet justo donec enim diam vulputate ut. Leo a diam sollicitudin tempor. Faucibus a pellentesque sit amet porttitor eget dolor. Rhoncus urna neque viverra justo nec ultrices dui. Tristique senectus et netus et malesuada fames ac turpis egestas. Enim blandit volutpat maecenas volutpat blandit aliquam. Tortor posuere ac ut consequat semper viverra nam libero justo. Leo urna molestie at elementum eu facilisis sed odio morbi. Donec adipiscing tristique risus nec. Convallis posuere morbi leo urna. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Nam aliquam sem et tortor consequat id porta nibh. In iaculis nunc sed augue lacus viverra vitae congue. Eget duis at tellus at urna. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Suscipit tellus mauris a diam maecenas sed. At elementum eu facilisis sed odio morbi quis commodo odio. Praesent elementum facilisis leo vel. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Purus semper eget duis at tellus at urna.\n' +
        '\n' +
        'Egestas fringilla phasellus faucibus scelerisque. Praesent tristique magna sit amet purus gravida. Elit ut aliquam purus sit amet luctus venenatis lectus. Id porta nibh venenatis cras sed. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Mi bibendum neque egestas congue quisque egestas diam in arcu. Facilisis leo vel fringilla est ullamcorper eget nulla. In cursus turpis massa tincidunt. Placerat in egestas erat imperdiet sed. Commodo nulla facilisi nullam vehicula. Duis ultricies lacus sed turpis tincidunt id aliquet. Arcu ac tortor dignissim convallis aenean et tortor. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Pellentesque dignissim enim sit amet venenatis urna cursus. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Nec feugiat nisl pretium fusce.';
    const blogBody2 = 'Cras semper auctor neque vitae tempus. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Purus gravida quis blandit turpis cursus in. Sapien nec sagittis aliquam malesuada bibendum. Feugiat sed lectus vestibulum mattis. Cursus euismod quis viverra nibh cras pulvinar mattis. Donec enim diam vulputate ut pharetra sit amet aliquam. Lectus proin nibh nisl condimentum. Condimentum lacinia quis vel eros donec ac odio tempor. A arcu cursus vitae congue. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Amet justo donec enim diam vulputate. Adipiscing at in tellus integer feugiat scelerisque varius. Sit amet cursus sit amet dictum. Nisi vitae suscipit tellus mauris. Proin nibh nisl condimentum id venenatis a condimentum vitae. Vel orci porta non pulvinar neque laoreet. Lacus vel facilisis volutpat est velit egestas dui id. Scelerisque felis imperdiet proin fermentum leo vel orci.\n' +
        '\n' +
        'Ullamcorper eget nulla facilisi etiam dignissim. Tincidunt lobortis feugiat vivamus at augue. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Ante in nibh mauris cursus mattis molestie. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Et leo duis ut diam quam nulla porttitor massa id. Odio ut sem nulla pharetra diam sit. Est ultricies integer quis auctor elit sed vulputate mi sit. A iaculis at erat pellentesque adipiscing commodo. Fringilla est ullamcorper eget nulla facilisi. Fermentum iaculis eu non diam phasellus vestibulum lorem. Arcu felis bibendum ut tristique. Velit laoreet id donec ultrices tincidunt arcu non. Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse. Iaculis nunc sed augue lacus viverra vitae congue. Ut aliquam purus sit amet luctus. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Nulla pellentesque dignissim enim sit.\n' +
        '\n' +
        'Tristique magna sit amet purus gravida quis blandit turpis. Vitae et leo duis ut diam quam nulla. Gravida cum sociis natoque penatibus et magnis. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Metus vulputate eu scelerisque felis imperdiet proin. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Viverra vitae congue eu consequat ac felis donec. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Aliquet sagittis id consectetur purus ut faucibus pulvinar.';
    const blogBody3 = 'Viverra accumsan in nisl nisi. Quis imperdiet massa tincidunt nunc pulvinar. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Nisi scelerisque eu ultrices vitae auctor eu. Lectus sit amet est placerat. Nullam non nisi est sit amet. Aliquet enim tortor at auctor urna nunc id cursus. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Turpis massa tincidunt dui ut ornare lectus sit amet. Nec feugiat nisl pretium fusce id velit ut tortor pretium.\n' +
        '\n' +
        'Cras semper auctor neque vitae tempus. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Purus gravida quis blandit turpis cursus in. Sapien nec sagittis aliquam malesuada bibendum. Feugiat sed lectus vestibulum mattis. Cursus euismod quis viverra nibh cras pulvinar mattis. Donec enim diam vulputate ut pharetra sit amet aliquam. Lectus proin nibh nisl condimentum. Condimentum lacinia quis vel eros donec ac odio tempor. A arcu cursus vitae congue. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Amet justo donec enim diam vulputate. Adipiscing at in tellus integer feugiat scelerisque varius. Sit amet cursus sit amet dictum. Nisi vitae suscipit tellus mauris. Proin nibh nisl condimentum id venenatis a condimentum vitae. Vel orci porta non pulvinar neque laoreet. Lacus vel facilisis volutpat est velit egestas dui id. Scelerisque felis imperdiet proin fermentum leo vel orci.\n' +
        '\n' +
        'Ullamcorper eget nulla facilisi etiam dignissim. Tincidunt lobortis feugiat vivamus at augue. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Ante in nibh mauris cursus mattis molestie. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Et leo duis ut diam quam nulla porttitor massa id. Odio ut sem nulla pharetra diam sit. Est ultricies integer quis auctor elit sed vulputate mi sit. A iaculis at erat pellentesque adipiscing commodo. Fringilla est ullamcorper eget nulla facilisi. Fermentum iaculis eu non diam phasellus vestibulum lorem. Arcu felis bibendum ut tristique. Velit laoreet id donec ultrices tincidunt arcu non. Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse. Iaculis nunc sed augue lacus viverra vitae congue. Ut aliquam purus sit amet luctus. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Nulla pellentesque dignissim enim sit.\n' +
        '\n' +
        'Tristique magna sit amet purus gravida quis blandit turpis. Vitae et leo duis ut diam quam nulla. Gravida cum sociis natoque penatibus et magnis. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Metus vulputate eu scelerisque felis imperdiet proin. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Viverra vitae congue eu consequat ac felis donec. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Aliquet sagittis id consectetur purus ut faucibus pulvinar.';


    let blogs = [
        { user: users[0]._id, title: 'Lorem ipsum', body: blogBody2, },
        { user: users[1]._id, title: 'Lorem ipsum', body: blogBody1, },
        { user: users[2]._id, title: 'Lorem ipsum', body: blogBody3, },
        { user: users[0]._id, title: 'Lorem ipsum', body: blogBody1, },
        { user: users[1]._id, title: 'Lorem ipsum', body: blogBody2, },
        { user: users[2]._id, title: 'Lorem ipsum', body: blogBody3, },
        { user: users[0]._id, title: 'Lorem ipsum', body: blogBody3, },
    ];
    try {
        for (const blog of blogs) {
            await Blog.create(blog);
            log.info(`Created blog ${blog.title}`);
        }
    } catch (e) {
        log.error(e);
    }
}