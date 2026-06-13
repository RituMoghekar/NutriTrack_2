const FAQ = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <ul className="list-disc pl-5 space-y-3">
        <li><strong>What is NutriTrack?</strong> A smart tool for managing family nutrition and groceries.</li>
        <li><strong>Can I use it offline?</strong> Some features like list storage work offline, but others need internet.</li>
        <li><strong>How do I order items?</strong> Through ASHA worker request or demo ordering feature.</li>
      </ul>
    </div>
  );
};

export default FAQ;
