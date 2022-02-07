export async function getServerSideProps(URL) {
  return {
    props: {
      url: URL,
    },
  };
}
