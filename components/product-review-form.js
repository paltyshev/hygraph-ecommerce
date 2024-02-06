import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Form from '@/ui/form';
import { Input, Textarea, Button } from "@nextui-org/react";


function ProductReviewForm({ product }) {
  const { handleSubmit, ...formMethods } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(),
        email: yup.string().required().email(),
        headline: yup.string().required(),
        name: yup.string().required(),
      })
    ),
  });

  const onSubmit = async (data) => {
    mutate(
      product.id,
      async ({ reviews: { aggregate, edges } }) => {
        try {
          const { review } = await fetch(
            '/api/graphcms/create-product-review',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                product: { connect: { id: product.id } },
                ...data,
              }),
            }
          ).then((res) => res.json());

          return {
            reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }],
            },
          };
        } catch (error) {
          console.log(error);
        }
      },
      false
    );
  };

  return (
    <Form
      className="space-y-4"
      methods={formMethods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        field="headline"
        label="Заголовок"
        placeholder="Введите заголовок"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          field="name"
          label="Имя"
          placeholder="Введите ваше имя"
          autoComplete="name"
        />
        <Input
          field="email"
          label="Email"
          placeholder="Введите ваш email"
          autoComplete="email"
        />
      </div>
      <Textarea
        field="content"
        label="Отзыв"
        placeholder="Напишите ваш отзыв"
      />
      <Button fullWidth="true" color="primary" type="submit">Отправить</Button>
    </Form>
  );
}

export default ProductReviewForm;
