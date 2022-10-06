import React, {useContext, useEffect, Fragment} from "react";
import {Link, useParams} from "react-router-dom";
import {GithubContext} from "../context/github/githubContext";
import {Repos} from "../components/Repos";

export const Profile = () => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const {name} = useParams()

  useEffect(() => {
    getUser(name)
    getRepos(name)
    // eslint-disable-nxt-line
  }, [])

  if (loading) {
    return <p className="text-center">Загрузка...</p>
  }

  const {
    company, avatar_url, location,
    bio, blog, login,
    html_url, followers, public_repos,
    public_gists, following
  } = user

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">На главную</Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img
                src={avatar_url}
                alt={name}
                style={{width: "150px"}}
              />
              <h1>{name}</h1>
              {location && <p>Местоположение: {location}</p>}
            </div>
            <div className="col">
              {
                bio && <Fragment>
                <h3>BIO</h3>
                <p>{bio}</p>
                </Fragment>
              }
              <a
                href={html_url}
                rel="noopener-norferrer"
                className="btn btn-dark"
              >Открыть профиль</a>
              <ul>
                {login && <li>
                  <strong>Username: </strong> {login}
                </li>}

                {company && <li>
                  <strong>Company: </strong> {company}
                </li>}

                {blog && <li>
                  <strong>Website: </strong> {blog}
                </li>}
              </ul>

              <span className="badge text-primary">Подписчики: {followers}</span>
              <div className="badge text-success">Подписан: {following}</div>
              <div className="badge text-info">Репозитории: {public_repos}</div>
              <div className="badge text-dark">Gists: {public_gists}</div>


            </div>
          </div>
        </div>
      </div>

      <Repos repos={repos} />
    </Fragment>
  )
}
