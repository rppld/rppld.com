import * as React from 'react'
import { NextPage } from 'next'
import { Story } from '../types'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Intro from '../components/Intro'
import createMarkup from '../utils/createMarkup'

// https://github.com/wesbos/Syntax/pull/451
// https://github.com/zeit/next.js/issues/9524

interface Props {
  story: Story
}

const IndexPage: NextPage<Props> = props => {
  console.log(props.story)

  return (
    <Layout>
      <Intro>
        <div
          dangerouslySetInnerHTML={createMarkup(props.story.content.intro)}
        />
      </Intro>
    </Layout>
  )
}

export async function unstable_getStaticProps() {
  const token = process.env.STORYBLOK_API_KEY
  const { story } = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/homepage?version=published&token=${token}&cv=1579120546`
  ).then(res => res.json())

  return {
    props: {
      story,
    },
  }
}

export default IndexPage
