const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="d-flex justify-content-center mt-3">
      <small>
       Copyright &copy; {currentYear} <strong><span>Iqrom</span></strong>. All Rights Reserved
      </small>
    </footer>
  );
};

export default Footer;
