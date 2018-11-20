const React = require("react");
const PropTypes = require("prop-types");
const slug = require("slug");
const { Link, Route } = require("react-router-dom");

function CustomLink(props) {
  // destructuring to get some object property references from the props object...
  const { to, children, match } = props;

  return (
    <Route
      path={to.pathname}
      children={() => {
        return (
          <li style={{listStyleType: 'none', fontWeight: match ? 'bold': 'normal'}}>
            <Link to={to}>{children}</Link>
          </li>
        );
      }}
    />
  );
}

function Sidebar(props) {
  // destructuring to get some variables out of the props object...
  const { title, list, loading, location, match } = props;


  return loading === true ? (
    <h3>Please wait...</h3>
  ) : (
    <div id='sidebar-div'>
      <h3 id='sidebar-heading'>{title}</h3>
      <ul id='sidebar-list'>
        {list.map(function(item) {
          return (
            <CustomLink
              key={item}
              to={{
                pathname: `${match.url}/${slug(item)}`,
                search: location.search
              }}
            >
              {item.toUpperCase()}
            </CustomLink>
          );
        })}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

module.exports = Sidebar;
