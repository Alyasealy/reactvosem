import { useEffect, useState } from 'react'
import style from './UsersPage.module.css'
import { Search } from '../../components/Search/Search';


export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState(''); 

    async function fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        setUsers(users);  
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

   
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(query.toLowerCase()) ||
               user.username.toLowerCase().includes(query.toLowerCase()) ||
               user.email.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <section>
            <div className="container">
                <p className={style.wq}>Пользователи</p>
                <Search handleChange={handleChange} />
                <div className={style.user_sec}>
                    
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => {
                            return (
                                <div className={style.us_one} key={user.id}>
                                    <p className={style.ee}>Имя {user.name}</p>
                                    <p>Фамилия {user.username}</p>
                                    <p>email {user.email}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className={style.er}>Не найдено пользователей</p>
                    )}
                </div>
            </div>
        </section>
    );
}