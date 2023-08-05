export default function Title(props) {
  return (
    <div>
      <div className="mb-4 fw-normal">
        <span className="px-2">
          <BackArrow onClick={(isEdit) => goBack(isEdit)} />
        </span>
        {props}
      </div>
    </div>
  );
}
