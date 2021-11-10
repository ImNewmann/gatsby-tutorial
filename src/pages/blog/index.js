import * as React from 'react';
import Layout from '../../components/layout';
import { Link, graphql } from 'gatsby';

const BlogPage = ({ data }) => {
    console.log(data);
    return (
        <Layout pageTitle="My Blog Posts">
            {data.allMdx.nodes.map((node) => (
                <article key={node.id}>
                    <h2>
                        <Link to={`/blog/${node.slug}`}>{node.frontmatter.title}</Link>
                    </h2>{' '}
                    <p>Posted: {node.frontmatter.date}</p>
                </article>
            ))}
        </Layout>
    );
};
export default BlogPage;

export const query = graphql`
    query {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                }
                id
                body
                parent {
                    ... on File {
                        modifiedTime(formatString: "MMMM D, YYYY")
                    }
                }
                slug
            }
        }
    }
`;
